import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import {
  create,
  get_tasks,
  user_tasks,
  delete_tasks,
  comp_task,
} from "./../reducers/tasks.js";
import { useSelector, useDispatch } from "react-redux";

const Tasks = () => {
  const state = useSelector((state) => {
    return {
      login: state,
      task: state.task,
      userTask: state.userTask,
    };
  });
  console.log(state);
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const moving = () => {
    // eslint-disable-next-line
    navigate("/");
  };

  //user tasks
  const getTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/allTasks`, {
        headers: { Authorization: `Bearer ${state.login.signIn.token}` },
      });

      const data = {
        tasks: res.data.map((item) => {
          return item;
        }),
      };
      // console.log(res.data, "data tasks");
      dispatch(user_tasks({ data }));

      setTasks(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log(state, "state task");

  //to get all users tasks for admins only------------------------
  const getAllUsersTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/adminGet`, {
        headers: { Authorization: `Bearer ${state.login.signIn.token}` },
      });

      const data = {
        tasks: res.data,
        // .map((item) => {
        //   return item;
        // }),
      };
      // console.log(res.data, "data tasks");
      dispatch(get_tasks({ data }));
      setUserTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //------------------------------------------------

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, [state.login.signIn.token]);

  useEffect(() => {
    getAllUsersTasks();
    // eslint-disable-next-line
  }, [state.login.signIn.token]);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      let newTask = e.target.addTask.value;
      console.log(newTask);
      // console.log(token);
      const res = await axios.post(
        `${BASE_URL}/task/${state.login.signIn.user._id}`,
        {
          name: newTask,
          headers: { Authorization: `Bearer ${state.login.signIn.toke}` },
        }
      );

      const data = {
        newTask: e.target.addTask.value,
      };
      dispatch(create({ date }));

      setTasks(res.data);
      getTasks();
      getAllUsersTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log(tasks);
  const completed = async (_id) => {
    try {
      // eslint-disable-next-line
      let res = await axios.put(`${BASE_URL}/check/${_id}`, {
        headers: {
          Authorization: `Bearer ${state.login.signIn.token}`,
        },
      });

      const data = {
        completed: "",
      };
      dispatch(comp_task({ data }));

      getTasks();
      getAllUsersTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const delTask = async (_id) => {
    try {
      // eslint-disable-next-line
      let res = await axios.delete(`${BASE_URL}/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${state.login.signIn.token}`,
        },
      });

      const data = {
        delTask: "",
      };
      dispatch(delete_tasks({ data }));

      getTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const adminDelTask = async (_id) => {
    try {
      // eslint-disable-next-line
      let res = await axios.delete(`${BASE_URL}/adminDel/${_id}`, {
        headers: {
          Authorization: `Bearer ${state.login.signIn.token}`,
        },
      });

      const data = {
        delTask: "",
      };
      dispatch(delete_tasks({ data }));

      getAllUsersTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOut = () => {
    localStorage.clear();
    // eslint-disable-next-line
    navigate("/");
  };

  const userInfo = () => {
    // eslint-disable-next-line
    navigate("/userInfo");
  };

  //here we get tasks by registered user id that i already placed in local storage

  return (
    <div>
      {!state.login.signIn.token ? (
        //           <>
        //   <h1>you must login or register first</h1>
        //   <button onClick={() => moving()}>Go</button>
        // </>
        <button onClick={moving()}>go</button>
      ) : (
        <div className="taskMainDiv">
          <h1>Tasks</h1>
          {tasks.length < 0 ? (
            <h1>no tasks found</h1>
          ) : (
            <>
              <form onSubmit={addTask}>
                <input
                  required
                  type="text"
                  name="addTask"
                  placeholder="add task"
                />
                <button type="submit">Add</button>
              </form>
              {state.login.signIn.user.role === "61a60b6d52ebd90581f0ff04" ? (
                <>
                  {userTasks.length > 0 ? (
                    userTasks.map((task, i) => {
                      return (
                        <div key={i + 9} className="taskDiv">
                          <>
                            <p
                              className={
                                !task.isCompleted ? "tasksP" : "taskDone"
                              }
                              key={i + 4}
                            >
                              {task.name}
                            </p>
                            <p
                              style={{
                                fontSize: "10px",
                                marginLeft: "-180px",
                                color: "gray",
                              }}
                            >
                              user id:
                              {task.userId}
                              {/* {tasks.map((task, i) => {
                                return(
                                <div key={i}>
                                  <p>{task.userId}</p>
                                </div>);
                              })} */}
                            </p>
                          </>
                          <div className="btnsDiv">
                            <button
                              key={i + 3}
                              className="btn"
                              id="delBtn"
                              onClick={() => adminDelTask(task._id)}
                            >
                              <img
                                className="iconImg"
                                src="https://img.icons8.com/small/32/000000/filled-trash.png"
                                alt="icon"
                              />
                            </button>
                            <button
                              key={i}
                              className="btn"
                              id="checkBtn"
                              onClick={() => completed(task._id)}
                            >
                              <img
                                className="iconImg"
                                src="https://img.icons8.com/ios-glyphs/30/000000/check-all.png"
                                alt="icon"
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h2>no tasks yet, try and add some!</h2>
                  )}
                </>
              ) : (
                <>
                  {tasks.length > 0 ? (
                    tasks.map((task, i) => {
                      return (
                        <div key={task.name} className="taskDiv">
                          <p
                            className={
                              !task.isCompleted ? "tasksP" : "taskDone"
                            }
                            key={task._id}
                          >
                            {task.name}
                          </p>
                          <div className="btnsDiv">
                            <button
                              key={i + 3}
                              className="btn"
                              id="delBtn"
                              onClick={() => delTask(task._id)}
                            >
                              <img
                                className="iconImg"
                                src="https://img.icons8.com/small/32/000000/filled-trash.png"
                                alt="icon"
                              />
                            </button>
                            <button
                              key={i}
                              className="btn"
                              id="checkBtn"
                              onClick={() => completed(task._id)}
                            >
                              <img
                                className="iconImg"
                                src="https://img.icons8.com/ios-glyphs/30/000000/check-all.png"
                                alt="icon"
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h2>no tasks yet, try and add some!</h2>
                  )}
                </>
              )}
            </>
          )}
          <button className="outBtn" onClick={logOut}>
            log out
          </button>
          <button className="outBtn" onClick={userInfo}>
            User Info
          </button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
