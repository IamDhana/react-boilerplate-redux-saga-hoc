/* eslint-disable indent */
import { updateIn, generateTimeStamp } from '../helpers';
export const deleteHandler = ({
  task: { key, id, subKey = [] } = {},
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
          _data =>
            (!Array.isArray(_data) && {}) ||
            (Array.isArray(id) &&
              _data.reduce(
                (acc, curr) =>
                  id.includes(curr[key]) ? acc : acc.concat([curr]),
                [],
              )) ||
            _data.filter(({ [key]: objId }) => objId !== id),
        )
      : (!Array.isArray(data) && successData) ||
        (Array.isArray(id) &&
          data.reduce(
            (acc, curr) => (id.includes(curr[key]) ? acc : acc.concat([curr])),
            [],
          )) ||
        data.filter(({ [key]: objId }) => objId !== id),
  lastUpdated: generateTimeStamp(),
  isError: false,
});
