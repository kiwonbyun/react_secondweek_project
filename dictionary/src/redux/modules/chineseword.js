// Actions
const CREATE = "chineseword/CREATE";
const DELETE = "chineseword/DELETE";
const COMPLETED = "chineseword/COMPLETED";
const UPDATE = "chineseword/UPDATE";
const init = {
  list: [
    {
      id: 1,
      단어: "成功",
      병음: "chénggōng",
      의미: "성공, 성공적이다",
      예문: "获得相当大的成功",
      해석: "상당히 큰 성공을 거두다",
      completed: false,
    },
  ],
};
// Action Creators

export function createWord(단어, 병음, 의미, 예문, 해석) {
  return { type: CREATE, 단어, 병음, 의미, 예문, 해석 };
}
export function deleteWord(index) {
  return { type: DELETE, index };
}
export function completeWord(index) {
  return { type: COMPLETED, index };
}
export function updateWord(단어, 병음, 의미, 예문, 해석, id) {
  return { type: UPDATE, 단어, 병음, 의미, 예문, 해석, id };
}

// Reducer
export default function chineseword(state = init, action = {}) {
  switch (action.type) {
    case CREATE: {
      const new_word_list = [
        ...state.list,
        {
          id: Date.now(),
          단어: action.단어,
          병음: action.병음,
          의미: action.의미,
          예문: action.예문,
          해석: action.해석,
          completed: false,
        },
      ];

      return { list: new_word_list };
    }
    case DELETE: {
      const new_word_list = state.list.filter((l, index) => {
        return parseInt(action.index) !== index;
      });
      return { list: new_word_list };
    }
    case COMPLETED: {
      const new_word_list = state.list.map((l, idx) => {
        if (parseInt(action.index) === idx) {
          return { ...l, completed: true };
        } else {
          return l;
        }
      });
      return { list: new_word_list };
    }
    case UPDATE: {
      console.log(state);
      const new_word_list = state.list.map((l, index) => {
        if (parseInt(action.id) === l.id) {
          return {
            id: action.id,
            completed: false,
            단어: action.단어,
            병음: action.병음,
            예문: action.예문,
            의미: action.의미,
            해석: action.해석,
          };
        } else {
          return l;
        }
      });
      return { list: new_word_list };
    }
    default:
      return state;
  }
}
