export function setColumnData(columnData) {
  localStorage.setItem('columnData', JSON.stringify(columnData));
}

export function getColumnData(key) {
  return JSON.parse(localStorage.getItem(key));
}