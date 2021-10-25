import { MarketPlace } from "../../types/marketplace";
import { SocialsMedia } from "../../types/socials";

/** exposes Game domain entity */
export interface IGame {
  id: string;
  name: string;
  hashtages?: string[];
  description: string;
  picture: string;
  status: string;
  socials?: SocialsMedia;
  marketplace?: MarketPlace;
  creatorID: string;
  createdDate: string;
  genre: string;
  rated: string;
  price: string;
  currency: string;
  likes: number[];
  comments: number[];
}
