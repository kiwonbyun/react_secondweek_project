import { db } from "../../firebase";
import {
  collection,
  doc,
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
  is_loaded: false,
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
export function updateWord(chinese_word) {
  return { type: UPDATE, chinese_word };
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

export const updateWordFB = (chinese_word) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "chinese_word", chinese_word.id);
    await updateDoc(docRef, {
      id: chinese_word.id,
      completed: false,
      단어: chinese_word.단어,
      병음: chinese_word.병음,
      예문: chinese_word.예문,
      의미: chinese_word.의미,
      해석: chinese_word.해석,
    });
    dispatch(updateWord(chinese_word));
  };
};

// Reducer
export default function chineseword(state = init, action = {}) {
  switch (action.type) {
    case LOAD: {
      return { list: action.chinese_list, is_loaded: true };
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

      return { ...state, list: new_word_list };
    }
    case DELETE: {
      const new_word_list = state.list.filter((l, index) => {
        return action.word_id !== l.id;
      });
      return { ...state, list: new_word_list };
    }
    case COMPLETED: {
      const new_word_list = state.list.map((l, idx) => {
        if (action.word_id === l.id) {
          return { ...l, completed: true };
        } else {
          return l;
        }
      });
      return { ...state, list: new_word_list };
    }
    case UPDATE: {
      const new_word_list = state.list.map((l, index) => {
        if (action.chinese_word.id === l.id) {
          return {
            id: action.chinese_word.id,
            completed: false,
            단어: action.chinese_word.단어,
            병음: action.chinese_word.병음,
            예문: action.chinese_word.예문,
            의미: action.chinese_word.의미,
            해석: action.chinese_word.해석,
          };
        } else {
          return l;
        }
      });
      return { ...state, list: new_word_list };
    }
    default:
      return state;
  }
}
