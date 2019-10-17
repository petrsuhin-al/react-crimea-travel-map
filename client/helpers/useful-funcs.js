/**
 *
 * Функция для вставки строки в строку с определенного символа.
 * Предусмотрено удаление символов после вставляемой строки, за ненадомностью параметр выразить как 0.
 *
 * @param {string} baseStr Начальная строка, которая должна быть преобразована.
 * @param {number} start Индекс символа строки, после которого вставляем pasteStr.
 * @param {number} delCount Целое число, указывающее количество удаляемых символов после вставляемой строки.
 * @param {string} pasteStr Строка которая вставляется.
 * @return {string} Новая строка с вставленной подстрокой.
 */
let pasteInString = (baseStr, start, delCount, pasteStr) => {
    if(!baseStr.length || !pasteStr.length) throw("pasteInString func. Error with strings...");
    if(!Number.isInteger(start) || !Number.isInteger(delCount)) throw("pasteInString func. Error with nums...");
    return baseStr.slice(0, start) + pasteStr + baseStr.slice(start + Math.abs(delCount));
};

export {
    pasteInString
};