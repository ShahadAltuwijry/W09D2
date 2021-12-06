import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { login } from "./../reducers/login.js";
import { useDispatch, useSelector } from "react-redux";

const Tasks = () => {
  const state = useSelector((state) => {
    return {
      login: state,
    };
  });
  const dispatch = useDispatch();

  // console.log(state.login.signIn.token, "statelog");

  const [tasks, setTasks] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const addToken = async () => {
    const userLogged = await localStorage.getItem("user");
    setToken(JSON.parse(userLogged));

    const id = await localStorage.getItem("id");
    setId(JSON.parse(id));

    const role = localStorage.getItem("role");
    setRole(JSON.parse(role));
  };

  useEffect(() => {
    addToken();
  }, []);

  const moving = () => {
    // eslint-disable-next-line
    navigate("/");
  };

  const getTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/allTasks`, {
        headers: { Authorization: `Bearer ${state.login.signIn.token}` },
      });

      //   console.log(res);
      setTasks(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //to get all users tasks for admins only------------------------
  const getAllUsersTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/adminGet`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      //   console.log(res.data);
      setUserTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //------------------------------------------------

  //   console.log(userTasks);

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    getAllUsersTasks();
    // eslint-disable-next-line
  }, [token]);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      let newTask = e.target.addTask.value;
      console.log(newTask);
      console.log(token);
      const res = await axios.post(`${BASE_URL}/task/${id}`, {
        name: newTask,
        // headers: { Authorization: `Bearer ${token}` },
      });

      //   console.log(res);
      setTasks(res.data);
      getTasks();
      getAllUsersTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const completed = async (_id) => {
    try {
      // eslint-disable-next-line
      let res = await axios.put(`${BASE_URL}/check/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
          Authorization: `Bearer ${token}`,
        },
      });
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
          Authorization: `Bearer ${token}`,
        },
      });
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
        <button onClick={() => moving()}>go</button>
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
              {role === "61a60b6d52ebd90581f0ff04" ? (
                <>
                  {userTasks.length > 0 ? (
                    userTasks.map((task, i) => {
                      return (
                        <div key={task.name} className="taskDiv">
                          <>
                            <p
                              className={
                                !task.isCompleted ? "tasksP" : "taskDone"
                              }
                              key={task._id}
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
