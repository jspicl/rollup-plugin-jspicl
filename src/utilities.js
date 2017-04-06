export default `
function merge(target, source)
  for key, value in pairs(source) do
    target[key] = value
  end

  return target
end

function join(table, separator)
  local result = ""

  for value in all(table) do
    result = result..separator..value
  end

  return result
end`;