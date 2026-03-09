import hoveniaTea1 from "../../assets/tea/Hovenia_Tea_fol/1.jpg";
import hoveniaDulcisImage from "../../assets/tea/Dulcis_extract.jpg";
import cornSilkTea1 from "../../assets/tea/Corn_Silk_fol/1.jpg";
import cornExtractImage from "../../assets/tea/corn_tea.jpg";
import blackBeanTeaImage from "../../assets/tea/black_bean_tea_extract.jpg";
import barleyTeaImage from "../../../e-shop/assets/barley-tea.png";

// Oil products
import sesameOilImage from "../../assets/oil/BEOK-sesameoil1.jpg";
import perillaOilImage from "../../assets/oil/BEOK-perillaoil3.jpg";
import saucesImage from "../../assets/oil/BEOK-sauces2.jpg";

  // Soju products
  import seorijuImage from "../../assets/alcohol/BEOK-seoriju3.jpg";

// Noodles products
import wheatNoodleImage from "../../assets/IMG_1701.jpg";
import giftSetImage from "../../assets/noodles/IMG_1700.jpg";
import potatoNoodleImage from "../../assets/noodles/BEOK-Potatonoodle3.jpg";
import hallabongNoodleImage from "../../assets/noodles/BEOK-Hanrabongnoodle3.jpg";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  isNew?: boolean;
  stock?: number;
}

export const products: Product[] = [
  // Tea products
  { id: 1, name: "Hovenia Dulcis Extract (헛개수)", category: "Tea", price: "$37", image: hoveniaTea1, isNew: true },
  { id: 2, name: "Corn Silk Tea Extract (옥미수/옥수수 수염차)", category: "Tea", price: "$58", image: cornSilkTea1, isNew: true, stock: 3 },
  { id: 3, name: "Black Bean Tea Extract (검은콩차 진액)", category: "Tea", price: "$58", image: blackBeanTeaImage, isNew: true },
  { id: 4, name: "Barley Tea Extract (보리차 진액)", category: "Tea", price: "$32", image: barleyTeaImage, isNew: true, stock: 2 },
  
  // Oil products
  { id: 5, name: "Cold Pressed Sesame Oil", category: "Oil", price: "$36", image: sesameOilImage, stock: 4 },
  { id: 7, name: "Cold Pressed Perilla Oil", category: "Oil", price: "$36", image: perillaOilImage, stock: 1 },
  { id: 8, name: "Cold Pressed Oil Gift Set", category: "Oil", price: "$68", image: saucesImage },
  
  // Soju products
  { id: 9, name: "Seoriju", category: "Soju", price: "$58", image: seorijuImage, stock: 3 },
  
  // Noodles products
  { id: 10, name: "Myeongawon Hand-Stretched Red Rice Noodle", category: "Noodles", price: "$12", image: wheatNoodleImage },
  { id: 11, name: "Myeongawon 5 Color Noodle Gift Set", category: "Noodles", price: "$26", image: giftSetImage, stock: 2 },
  { id: 12, name: "Potato Noodle", category: "Noodles", price: "$22", image: potatoNoodleImage },
  { id: 13, name: "Hallabong Noodle", category: "Noodles", price: "$22", image: hallabongNoodleImage },
];

export const categoryTabs = [
  "All",
  "Tea",
  "Oil",
  "Noodles",
  "Soju",
];