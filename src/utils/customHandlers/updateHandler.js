/* eslint-disable */
import { updateIn, newObject, generateTimeStamp } from '../helpers';
import Safe from '../nullCheck';
const updateData = (data, successData, updateCallback) => {
  if (updateCallback) return updateCallback(data, successData) || data;
  if (
    typeof successData === 'object' &&
    !Array.isArray(successData) &&
    typeof data === 'object' &&
    !Array.isArray(data)
  )
    return newObject(data, successData);
  return successData;
};

export const updateHandler = ({
  task: { key, id, subKey = [], values = {} } = {},
  callback: { updateCallback } = {},
  successData = {},
}) => ({ data = [] } = {}) => ({
  data:
    subKey.length > 0
      ? updateIn(
          {
            ...data,
            ...successData,
            [subKey[0]]: data[subKey[0]],
          },
          subKey,
          _Data =>
            (() => {
              let index = -1;
              const _values = Array.isArray(values);
              /**  update data if old data is object */
              if (!Array.isArray(_Data))
                return updateData(
                  _Data,
                  Safe(successData, `.${subKey.join('.')}`),
                  updateCallback,
                );
              else if (Array.isArray(id) && key && Array.isArray(_Data))
                return _Data.reduce(
                  (acc, curr = {}) =>
                    id.includes(curr[key])
                      ? (() => {
                          index = index + 1;
                          return acc.concat([
                            updateData(
                              curr,
                              values[_values ? index : curr[key]] || curr,
                              updateCallback,
                            ),
                          ]);
                        })()
                      : acc.concat([curr]),
                  [],
                );
              else if ((id === 0 || id) && key)
                return _Data.map(_data =>
                  _data[key] === id
                    ? (() => {
                        index = index + 1;
                        return updateData(
                          _data,
                          values[_values ? index : curr[key]] || _data,
                          updateCallback,
                        );
                      })()
                    : _data,
                );
              return updateData(
                _Data,
                Safe(successData, `.${subKey.join('.')}`),
                updateCallback,
              );
            })(),
        )
      : (() => {
          let index = -1;
          const _values = Array.isArray(values);
          if (!Array.isArray(data))
            return updateData(data, successData, updateCallback);
          else if (Array.isArray(id) && key)
            return data.reduce(
              (acc, curr = {}) =>
                id.includes(curr[key])
                  ? (() => {
                      index = index + 1;
                      return acc.concat([
                        updateData(
                          curr,
                          values[_values ? index : curr[key]] || curr,
                          updateCallback,
                        ),
                      ]);
                    })()
                  : acc.concat([curr]),
              [],
            );
          else if ((id === 0 || id) && key)
            return data.map(_data =>
              _data[key] === id
                ? (() => {
                    index = index + 1;
                    return updateData(
                      _data,
                      values[_values ? index : _data[key]] || _data,
                      updateCallback,
                    );
                  })()
                : _data,
            );
          return updateData(data, successData, updateCallback);
        })(),
  lastUpdated: generateTimeStamp(),
  isError: false,
});
