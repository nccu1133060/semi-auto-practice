import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { addTodo, formatDueDate, isTodoOverdue, toggleTodo } from './todo.js';

test('addTodo appends a trimmed, incomplete item without changing the input list', () => {
  const list = [{ id: 1, text: '原有待辦', completed: false }];
  const result = addTodo(list, '  新待辦  ');

  assert.deepEqual(result, [
    { id: 1, text: '原有待辦', completed: false },
    { id: 2, text: '新待辦', completed: false },
  ]);
  assert.deepEqual(list, [{ id: 1, text: '原有待辦', completed: false }]);
});

test('addTodo rejects text containing only whitespace', () => {
  assert.throws(() => addTodo([], ' \t '), { message: 'EMPTY_TEXT' });
});

test('addTodo stores an optional due date without changing earlier items', () => {
  const list = [{ id: 1, text: '原有待辦', completed: false }];
  const result = addTodo(list, '繳費', '2025-10-15');

  assert.deepEqual(result.at(-1), {
    id: 2, text: '繳費', completed: false, dueDate: '2025-10-15',
  });
  assert.deepEqual(list, [{ id: 1, text: '原有待辦', completed: false }]);
});

test('toggleTodo switches only the selected item and preserves the input list', () => {
  const list = [
    { id: 1, text: '甲', completed: false },
    { id: 2, text: '乙', completed: false },
  ];
  const result = toggleTodo(list, 2);

  assert.deepEqual(result, [
    { id: 1, text: '甲', completed: false },
    { id: 2, text: '乙', completed: true },
  ]);
  assert.deepEqual(list, [
    { id: 1, text: '甲', completed: false },
    { id: 2, text: '乙', completed: false },
  ]);
  assert.deepEqual(toggleTodo(result, 2), list);
});

test('only unfinished todos due before the supplied local day are overdue', () => {
  const past = { dueDate: '2025-10-14', completed: false };
  assert.equal(isTodoOverdue(past, '2025-10-15'), true);
  assert.equal(isTodoOverdue({ ...past, completed: true }, '2025-10-15'), false);
  assert.equal(isTodoOverdue({ ...past, dueDate: '2025-10-15' }, '2025-10-15'), false);
  assert.equal(isTodoOverdue({ ...past, dueDate: '2025-10-16' }, '2025-10-15'), false);
  assert.equal(isTodoOverdue({ completed: false }, '2025-10-15'), false);
});

test('formatDueDate shows month, day, and local weekday', () => {
  assert.equal(formatDueDate('2025-10-15'), '期限：10/15（三）');
});

function setupPage({ text = '鍵盤新增', dueDate = '', now = '2025-10-15T12:00:00' } = {}) {
  const makeElement = () => {
    const element = {
      className: '',
      append: function (...children) { this.children.push(...children); },
      addEventListener: function (name, listener) { this.listeners[name] = listener; },
      children: [],
      listeners: {},
      setAttribute: function (name, value) { this[name] = value; },
    };
    element.classList = {
      add: (name) => { element.className += ` ${name}`; },
      contains: (name) => element.className.split(/\s+/).includes(name),
      toggle: (name, enabled) => {
        element.className = element.className.split(/\s+/).filter((part) => part && part !== name).join(' ');
        if (enabled) element.classList.add(name);
      },
    };
    return element;
  };
  const form = makeElement();
  const button = makeElement();
  form.querySelector = () => button;
  const input = makeElement();
  input.value = text;
  const dueInput = makeElement();
  dueInput.value = dueDate;
  const error = makeElement();
  const emptyState = makeElement();
  const todoList = makeElement();
  const elements = {
    '#todo-form': form,
    '#todo-input': input,
    '#todo-due-date': dueInput,
    '#todo-error': error,
    '#empty-state': emptyState,
    '#todo-list': todoList,
  };
  const document = {
    querySelector: (selector) => elements[selector],
    createElement: () => makeElement(),
  };
  const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
  const script = html.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, 'page module script exists');
  const FixedDate = class extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
  };
  runInNewContext(script.replace(/^\s*import .*?;\s*/m, ''), {
    document, addTodo, toggleTodo, formatDueDate, isTodoOverdue, Date: FixedDate,
  });

  return { form, input, dueInput, error, emptyState, todoList };
}

test('pressing Enter to add a todo applies the entrance animation', () => {
  const { form, todoList } = setupPage();

  form.listeners.submit({ preventDefault() {} });

  assert.equal(todoList.children.length, 1);
  assert.equal(todoList.children[0].classList.contains('just-added'), true);
});

test('submitting a todo with a due date shows it below the text and clears the date input', () => {
  const { form, dueInput, todoList } = setupPage({ text: '繳費', dueDate: '2025-10-15' });

  form.listeners.submit({ preventDefault() {} });

  const label = todoList.children[0].children[0];
  const content = label.children[1];
  assert.equal(content.children[0].textContent, '繳費');
  assert.equal(content.children[1].children[0].textContent, '期限：10/15（三）');
  assert.equal(dueInput.value, '');
});

test('an overdue label follows the checkbox state', () => {
  const { form, todoList } = setupPage({ dueDate: '2025-10-14' });
  form.listeners.submit({ preventDefault() {} });

  const item = todoList.children[0];
  const label = item.children[0];
  const checkbox = label.children[0];
  const overdue = label.children[1].children[1].children[1];
  assert.equal(overdue.textContent, '已逾期');
  assert.equal(overdue.hidden, false);

  checkbox.listeners.change();
  assert.equal(overdue.hidden, true);
  checkbox.listeners.change();
  assert.equal(overdue.hidden, false);
});
