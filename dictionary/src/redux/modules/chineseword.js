import { db } from "../../firebase";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

// Actions
const LOAD = "chineseword/LOAD";
const CREATE = "chineseword/CREATE";
const DELETE = "chineseword/DELETE";
const COMPLETED = "chineseword/COMPLETED";
const UPDATE = "chineseword/UPDATE";
const init = {
  list: [{}],
};
// Action Creators

export function loadWord(chinese_list) {
  return { type: LOAD, chinese_list };
}

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

//middlewares
export const loadWordFB = () => {
  return async function (dispatch) {
    const word_data = await getDocs(collection(db, "chinese_word"));
    let chinese_list = [];
    word_data.forEach((doc) => {
      console.log({ id: doc.id, ...doc.data() });
      chinese_list.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadWord(chinese_list));
  };
};

// Reducer
export default function chineseword(state = init, action = {}) {
  switch (action.type) {
    case LOAD: {
      return { list: action.chinese_list };
    }
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
