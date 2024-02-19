"use client";
import { useState, useEffect } from "react";

export default function MainPage() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  });

  const [debtList, setDebtList] = useState(() => {
    const savedDebtList = localStorage.getItem("debtList");
    if (savedDebtList) {
      return JSON.parse(savedDebtList);
    } else {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("debtList", JSON.stringify(debtList));
  }, [tasks, debtList]);

  const updateDebtList = (payer, payees, price) => {
    const debt = { ...debtList };
    payees.forEach((payee) => {
      if (!debt[payer]) {
        debt[payer] = {};
      }
      if (!debt[payer][payee]) {
        debt[payer][payee] = 0;
      }
      debt[payer][payee] += price / payees.length;
    });
    setDebtList(debt);
  };

  const addTask = () => {
    const newTaskName = prompt("Please enter new task");
    const newTaskPrice = parseFloat(prompt("Please enter task price"));
    const payer = prompt("Who is paying for this task?");
    const payees = prompt("Who has to pay for this task? (Separate names with commas)",).split(",");
    if (newTaskName && newTaskPrice && payer && payees) {
      setTasks([
        ...tasks,
        { name: newTaskName, price: newTaskPrice, payer, payees },
      ]);
      updateDebtList(payer, payees, newTaskPrice);
    }
  };

  const editTask = (index) => {
    const newTaskName = prompt("Please enter new task");
    const newTaskPrice = parseFloat(prompt("Please enter task price"));
    const payer = prompt("Who is paying for this task?");
    const payees = prompt("Who has to pay for this task? (Separate names with commas)",).split(",");
    if (newTaskName && newTaskPrice && payer && payees) {
      const newTasks = [...tasks];
      newTasks[index] = {
        name: newTaskName,
        price: newTaskPrice,
        payer,
        payees,
      };
      setTasks(newTasks);
      updateDebtList(payer, payees, newTaskPrice);
    }
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const totalCost = tasks.reduce((total, task) => total + task.price, 0);

  return (
    <>
      <div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.name} - ${task.price} - Paid by: {task.payer} - Payees:{" "}
              {(task.payees || []).join(", ")}
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>Total cost: ${totalCost}</div>
      <div>
        {Object.entries(debtList).map(([payer, debts]) => (
          <div key={payer}>
            {payer} owes:
            {Object.entries(debts).map(([payee, amount]) => (
              <div key={payee}>
                {payee}: ${amount}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
