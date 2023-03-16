import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

function Checklist() {
  const [checklist, setChecklist] = useState([
    { id: 1, value: 'Learn Javascript', check: false },
    { id: 2, value: 'Learn React', check: false },
    { id: 3, value: 'Build React App', check: false },
  ]);
  const [savedList, setSavedList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    handleSearch();
  }, [search]);

  useEffect(() => {
    setSavedList(checklist);
  }, []);

  const clickedCheck = (event) => {
    const tempArray = savedList.map((item) => {
      if (item.value == event.target.value) {
        return {
          ...item,
          check: !item.check,
        };
      }
      return item;
    });
    setSavedList(tempArray);
    setChecklist(tempArray);
  };

  const handleAllButton = () => {
    setChecklist([...savedList]);
  };

  const handleActiveButton = () => {
    let tempChecked = [];
    let i = 0;
    while (i < savedList.length) {
      if (!(savedList[i].check)) {
        tempChecked.push(savedList[i]);
      }
      i++;
    }
    setChecklist(tempChecked);
  };

  const handleCompleteButton = () => {
    let tempChecked = [];
    let i = 0;
    while (i < savedList.length) {
      if (savedList[i].check) {
        tempChecked.push(savedList[i]);
      }
      i++;
    }
    setChecklist(tempChecked);
  };

  const handleRemoveButton = () => {
    let tempChecked = [];
    let i = 0;
    while (i < savedList.length) {
      if (!savedList[i].check) {
        tempChecked.push(savedList[i]);
      }
      i++;
    }
    setSavedList(tempChecked); 
    setChecklist(tempChecked);
  };

  const searchList = (value) => {
    const searchValue = Object.values(value)[1].toLowerCase();

    if (searchValue.includes(search.toLowerCase())) {
      return true;
    }
    return false;
  };

  const handleSearch = () => {
    if (search.length > 0 && checklist.length != 0) {
      setChecklist(savedList.filter(searchList));
    }
    if (search.length == 0 && savedList.length != 0) {
      setChecklist([...savedList]);
    }
  };

  const handleAddNew = (event) => {
    if (search.length > 0 && !/^\s*$/.test(search)) {
      if(savedList.length > 0) {
        let tempArray = [
          ...savedList,
          {
            id: savedList[savedList.length - 1].id + 1,
            value: search,
            check: false,
          },
        ];
        setChecklist(tempArray);
        setSavedList(tempArray);
        setSearch('');
      }
      else {
        let tempArray = [ {
          id: 1,
          value: search,
          check: false,
        }];
        setChecklist(tempArray);
        setSavedList(tempArray);
        setSearch('');
      }
    }
  };

  return (
    <>
      <h1>THINGS TO DO</h1>

      <div className="container">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button type="button" onClick={handleAddNew}>
          +
        </button>
      </div>

      {checklist.map((item, index) => {
        return (
          <div className="checkList" key={item.id}>
            <input
              type="checkbox"
              name="checklist"
              value={item.value}
              checked={item.check}
              onChange={clickedCheck}
            />
            <label>{item.value}</label>
          </div>
        );
      })}

      <div className="buttonRow">
        <button type="button" className="button" onClick={handleAllButton}>
          All
        </button>
        <button type="button" className="button" onClick={handleActiveButton}>
          Active
        </button>
        <button type="button" className="button" onClick={handleCompleteButton}>
          Completed
        </button>
        <button type="button" className="button" onClick={handleRemoveButton}>
          Remove
        </button>
      </div>
      <p>{savedList.length} items left.</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Checklist />);
