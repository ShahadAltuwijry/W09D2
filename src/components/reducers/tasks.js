const initialState = {
  tasks: [],
};

const task = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "CREATE":
      const { newTask } = payload;
      return state;

    case "GETTING":
      const { task } = payload;
      return { task };

    case "GETUTASK":
      const { userTask } = payload;
      return { userTask };

    case "DELETE":
      const { delTask } = payload;
      return state;

    case "COMPLETE":
      const { completed } = payload;
      return state;

    default:
      return state;
  }
};

export const create = (data) => {
  return {
    type: "CREATE",
    payload: "",
  };
};

export const get_tasks = (data) => {
  //   console.log("data", data.data.tasks);

  return {
    type: "GETTING",
    payload: data.data,
  };
};

export const user_tasks = (data) => {
  return {
    type: "GETUTASK",
    payload: data.data,
  };
};

export const delete_tasks = (data) => {
  return {
    type: "DELETE",
    payload: "",
  };
};

export const comp_task = (data) => {
  return {
    type: "COMPLETE",
    payload: "",
  };
};
