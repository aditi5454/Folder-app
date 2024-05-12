import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Folder from "../../assets/images/Folder.png";
import File from "../../assets/images/File.png";
import "./NewComp.css";

const NewComp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, folderName } = location.state;
  console.log(folderName);
  const [showFileOptions, setShowFileOptions] = useState(false);
  const [prevItem, setPrevItem] = useState(null);
  // const [breadCrum, setBreadCrum] = useState("");
  // const [prevPath, setPrevPath] = useState([]);
  const buttons = ["copy", "delete", "rename"];

  // useEffect(() => {
  //   setBreadCrum(`${breadCrum} / ${folderName}`);
  // }, [setBreadCrum, folderName]);

  const singleClickHandler = (event, type) => {
    const item = event.target;
    if (prevItem && item !== prevItem) {
      prevItem.className = "component-item-image";
    }
    item.className = "component-item-image pressed";
    setPrevItem(item);
  };

  const doubleClickHandler = (foldername, data, type) => {
    if (type === "folder") {
      navigate(`/${foldername}`, {
        state: { data: data, folderName: foldername },
      });
    } else {
      setShowFileOptions(!showFileOptions);
    }
  };

  const fetchImage = (type) => {
    return type === "folder" ? Folder : File;
  };

  return (
    <div
      className="component-container"
      onClick={showFileOptions ? () => setShowFileOptions(false) : null}
    >
      {/*<div className="breadcrum">{breadCrum}</div>*/}
      <div className="folder-container">
        {data &&
          data.map((item) => {
            return (
              <div className="component-item">
                {item.type && (
                  <img
                    src={fetchImage(item.type)}
                    alt={item.type}
                    onClick={(event) => singleClickHandler(event, item.type)}
                    onDoubleClick={() =>
                      doubleClickHandler(item.name, item.data, item.type)
                    }
                    width={80}
                    height={80}
                    className="component-item-image"
                  />
                )}
                {item.name && (
                  <div className="component-item-name">{item.name}</div>
                )}
                {item.type === "file" && showFileOptions && (
                  <div className="modal">
                    {buttons.map((item) => {
                      return (
                        <div className="modal-item-box">
                          <div
                            className="modal-item"
                            onClick={() => {
                              console.log(`${item}`);
                              setShowFileOptions(false);
                            }}
                          >
                            {item}
                          </div>
                          <hr />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NewComp;

// const item = event.target;
//   if (!prevItem) {
//     item.src = type === "folder" ? SelectedFolder : SelectedFile;
//     setChangeIcon(true);
//   }

//   if (prevItem && prevItem === item) {
//     if (changeIcon) {
//       item.src = type === "folder" ? Folder : File;
//       setChangeIcon(false);
//     } else {
//       item.src = type === "folder" ? SelectedFolder : SelectedFile;
//       setChangeIcon(true);
//     }
//   }

//   if (prevItem && prevItem !== item) {
//     if (changeIcon) {
//       prevItem.src = prevItem.alt === "folder" ? Folder : File;
//       item.src = type === "folder" ? SelectedFolder : SelectedFile;
//     }else{
//       item.src = type === "folder" ? SelectedFolder : SelectedFile;
//       setChangeIcon(true);
//     }
//   }

//   setPrevItem(item);
