import { db } from "../../firebase";
import {
  collection,
  doc,
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

export function createWord(chinese_word) {
  return { type: CREATE, chinese_word };
}
export function deleteWord(word_id) {
  return { type: DELETE, word_id };
}
export function completeWord(word_id) {
  return { type: COMPLETED, word_id };
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
      chinese_list.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadWord(chinese_list));
  };
};

export const createWordFB = (chinese_word) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "chinese_word"), chinese_word);
    const _chinese_word = { id: docRef.id, ...chinese_word };

    dispatch(createWord(_chinese_word));
  };
};

export const completeWordFB = (word_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "chinese_word", word_id);
    await updateDoc(docRef, { completed: true });
    dispatch(completeWord(word_id));
  };
};

export const deleteWordFB = (word_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "chinese_word", word_id);
    await deleteDoc(docRef);
    dispatch(deleteWord(word_id));
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
          id: action.chinese_word.id,
          completed: false,
          단어: action.chinese_word.단어,
          병음: action.chinese_word.병음,
          의미: action.chinese_word.의미,
          예문: action.chinese_word.예문,
          해석: action.chinese_word.해석,
        },
      ];
      console.log(new_word_list);

      return { list: new_word_list };
    }
    case DELETE: {
      const new_word_list = state.list.filter((l, index) => {
        return action.word_id !== l.id;
      });
      return { list: new_word_list };
    }
    case COMPLETED: {
      const new_word_list = state.list.map((l, idx) => {
        if (action.word_id === l.id) {
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
