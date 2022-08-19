//initial counter
const counterEl = document.getElementById("counter");

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const RESET_ALL = "reset_all";
const ADD_COUNTER = "add_counter";

//initial state
const initialState = {
  data: [
    {
      id: 154353475,
      count: 0,
      random: 1,
    },
  ],
};

// create reducer function
const counterReducer = (state = initialState, action) => {
  if (action.type === RESET_ALL) {
    return {
      ...state,
      data: action.payload.data,
    };
  }
  if (action.type === ADD_COUNTER) {
    return {
      ...state,
      data: action.payload.data,
    };
  }
  if (action.type === INCREMENT) {
    return {
      ...state,
      data: action.payload.data,
    };
  }
  if (action.type === DECREMENT) {
    return {
      ...state,
      data: action.payload.data,
    };
  }
  return state;
};

//creating store
const store = Redux.createStore(counterReducer);

//store subscrive
const container = document.getElementById("container");
let emtyDiv = document.createElement("div");
emtyDiv.innerHTML = `<div class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-gray-800 rounded shadow">
  <div class="text-2xl font-semibold">
   <h4> Counter Emty</h4>
  </div>
</div>`;

//store dispatch
const render = () => {
  const state = store.getState()?.data;
  state.map((item) => {
    document.getElementById("containerRM").remove();
    const createDiv = document.createElement("div");
    createDiv.innerHTML = ` <div id="containerRM">
    <div
      class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-gray-800 rounded shadow"
    >
     <div class="text-2xl text-white font-semibold" id="${item.id}">
     ${item.count * item.random}
      </div>
      <div class="${item.id}">
        <div class="flex space-x-3">
          <button class="bg-indigo-400 text-white px-3 py-2 rounded shadow"onclick="handleIncrement()">
            Increment ${item.random}
          </button>
          <button class="bg-red-400 text-white px-3 py-2 rounded shadow" onclick="handleDecrement()">
            Decrement ${item.random}
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>`;
    container.append(createDiv);
  });
};

render();
store.subscribe(render);

//add functions render dom
const handleAddContainer = () => {
  console.log("add counter item");
  let id = Date.now();
  const createDiv = document.createElement("div");
  createDiv.innerHTML = ` <div id="containerRM">
  <div
    class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
  >
      <div class="text-2xl font-semibold" id="${id}">
          0
      </div>
      <div class="${id}">
        <div class="flex space-x-3">
         <button class="bg-indigo-400 text-white px-3 py-2 rounded shadow"onclick="handleIncrement()">
            Increment
          </button>
          <button class="bg-red-400 text-white px-3 py-2 rounded shadow" onclick="handleDecrement()">
           Decrement
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;

  container.append(createDiv);
  const randmonValue = ~~(Math.random() * (5 - 1 + 1)) + 1;
  store.dispatch({
    type: ADD_COUNTER,
    payload: {
      data: [
        ...store.getState().data,
        { id: id, count: 0, random: randmonValue },
      ],
    },
  });
};

//erase function render dom
const eraseCounterFunc = () => {
  const state = store.getState()?.data;
  for (const item of state) {
    document.getElementById("containerRM").remove();
  }
  store.dispatch({
    type: ERASE_ALL,
    payload: {
      data: [],
    },
  });
};

//reset function render redux store
const handleResetContainer = () => {
  const allstate = store.getState()?.data;
  const resetArr = [];
  for (const item of allstate) {
    const copyObj = {
      ...item,
      count: 0,
    };
    resetArr.push(copyObj);
  }
  store.dispatch({
    type: RESET_ALL,
    payload: {
      data: resetArr,
    },
  });
};

//increcrement function render redux store
const handleIncrement = () => {
  const allstate = store.getState()?.data;
  const currentId = event.target.parentNode.parentNode.className;
  const currentReplaceStore = allstate.filter((item, index) => {
    if (item.id.toString() === currentId.toString()) {
      const copyObj = {
        ...item,
        count: ++item.count,
      };
      document.getElementById(currentId).innerText = item.count;
      return (allstate[index] = copyObj);
    } else {
      return {
        ...item,
        item: item,
        total: item.total,
      };
    }
  });
  store.dispatch({
    type: INCREMENT,
    payload: {
      data: currentReplaceStore,
    },
  });
};

//decrement function render redux store
const handleDecrement = () => {
  const allstate = store.getState()?.data;
  const currentId = event.target.parentNode.parentNode.className;
  const currentReplaceStore = allstate.filter((item, index) => {
    if (item.id.toString() === currentId.toString()) {
      const copyObj = {
        ...item,
        count: --item.count,
      };

      document.getElementById(currentId).innerText = item.count;
      return (allstate[index] = copyObj);
    } else {
      return {
        ...item,
        item: item,
      };
    }
  });
  store.dispatch({
    type: DECREMENT,
    payload: {
      data: currentReplaceStore,
    },
  });
};
