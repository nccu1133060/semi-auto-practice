export function addTodo(list, text, dueDate) {
  const trimmedText = text.trim();
  if (!trimmedText) throw new Error('EMPTY_TEXT');
  const nextId = Math.max(0, ...list.map((todo) => todo.id)) + 1;
  return [...list, {
    id: nextId, text: trimmedText, completed: false,
    ...(dueDate ? { dueDate } : {}),
  }];
}

export function toggleTodo(list, id) {
  return list.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

export function isTodoOverdue(todo, today) {
  return Boolean(todo.dueDate && !todo.completed && todo.dueDate < today);
}

export function formatDueDate(dueDate) {
  const [year, month, day] = dueDate.split('-').map(Number);
  const weekday = '日一二三四五六'[new Date(year, month - 1, day).getDay()];
  return `期限：${month}/${day}（${weekday}）`;
}
