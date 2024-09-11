import profile from "../assets/images/profile.png";
import thumbnail from "../assets/images/thumbnail.png";
import cards from "../assets/images/cards.png";
import path from "../assets/images/path.png";
import logo from "../assets/images/logo.png";
import logoSmall from "../assets/images/logo-small.png";
import empty from "../assets/images/empty.png";
import unknownTrackImage from "../assets/images/unknown_track.png";
import { Image } from "react-native";

export const unknownTrackImageUri = Image.resolveAssetSource(unknownTrackImage).uri
export default { profile, thumbnail, cards, path, logo, logoSmall, empty };
