import React, { useEffect, useState } from "react";
import Folder from "../../assets/images/Folder.png";
import File from "../../assets/images/File.png";
import { useNavigate } from "react-router";
import "./Home.css";

const Home = () => {
  const [structure, setStructure] = useState();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/9846505d-43e1-4fd0-9998-48c773b41c39"
        );
        const data = await response.json();
        setStructure(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStructure();
  }, []);

  const singleClickHandler = (event) => {
    const item = event.target;
    item.className = clicked ? 'component-item-image' : 'component-item-image pressed';
    setClicked(!clicked);
  };

  const doubleClickHandler = (foldername, data) => {
    navigate(`/${foldername}`, {
      state: { data: data, folderName: foldername },
    });
  };

  const fetchImage = (type) => {
    return type === "folder" ? Folder : File;
  };

  return (
    <div className="home-container">
      {structure && (
        <div className="home-item">
          <img
            src={fetchImage(structure.type)}
            alt={structure.type}
            onClick={(event) => singleClickHandler(event)}
            onDoubleClick={() =>
              doubleClickHandler(structure.name, structure.data)
            }
            width={80}
            height={80}
            className="component-item-image"
          />
          <div className="home-item-name">{structure.name}</div>
        </div>
      )}
    </div>
  );
};

export default Home;
