import { ENTITY_TYPE } from "../constants/helpers";
import Folder from "../../common/assets/images/folder-type.png";
import File from "../../common/assets/images/file-type.png";

export const fetchImage = (type) => {
  return type === ENTITY_TYPE.FOLDER ? Folder : File;
};
