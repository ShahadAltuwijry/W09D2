const initialState = {
  tasks: [],
};

const task = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GETTING":
      const { tasks } = payload;
      return { tasks };

    default:
      return state;
  }
};

export default task;

export const get_tasks = (data) => {
  //   console.log("data", data.data.tasks);

  return {
    type: "GETTING",
    payload: data.data,
  };
};
