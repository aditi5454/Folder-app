import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Home.css";
import { fetchFolderStructure } from "../../common/services/folderStructure";
import { fetchImage } from "../../common/utils/helper";
import { ENTITY_TYPE } from "../../common/constants/helpers";

const Home = () => {
  const navigate = useNavigate();
  const [folderStructure, setFolderStructure] = useState();
  const [selected, setSelected] = useState("");
  const [level, setLevel] = useState(0);
  const [currentFolder, setCurrentFolder] = useState();

  const getFolderStructure = async () => {
    fetchFolderStructure()
      .then((result) => {
        setFolderStructure(result);
        setCurrentFolder(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFolderStructure();
  }, []);

  const singleClickHandler = (name) => {
    if (name === selected) {
      setSelected("");
    } else {
      setSelected(name);
    }
  };

  const doubleClickHandler = (entityName, data) => {
    // navigate(`/${foldername}`, {
    //   state: { data: data, folderName: foldername },
    // });

    if (currentFolder.type === ENTITY_TYPE.FILE) {
      alert(`You clicked on file ${entityName}`);
    }else{
      setLevel(level+1);
      setCurrentFolder()
    }
  };

  if (level === 0) {
    return (
      <div className="home-container">
        {currentFolder && (
          <div className="home-item">
            <img
              src={fetchImage(currentFolder.type)}
              alt={currentFolder.type}
              onClick={() => singleClickHandler(currentFolder.name)}
              onDoubleClick={() =>
                doubleClickHandler(currentFolder, currentFolder.data)
              }
              width={80}
              height={80}
              className={
                selected === currentFolder.name
                  ? "component-item-image pressed"
                  : "component-item-image"
              }
            />
            <div className="home-item-name">{currentFolder.name}</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="home-container">
      {currentFolder && (
        <div className="home-item">
          <img
            src={fetchImage(currentFolder.type)}
            alt={currentFolder.type}
            onClick={() => singleClickHandler(currentFolder.name)}
            onDoubleClick={() =>
              doubleClickHandler(currentFolder, currentFolder.data)
            }
            width={80}
            height={80}
            className={
              selected === currentFolder.name
                ? "component-item-image pressed"
                : "component-item-image"
            }
          />
          <div className="home-item-name">{currentFolder.name}</div>
        </div>
      )}
    </div>
  );
};

export default Home;
