import { ModalOptions } from "flowbite";
import { storage } from "./storage/storage";
import { environment } from "@env/environment";

export const defaultModalOptions: ModalOptions = {
  backdrop: 'static',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  placement: 'center',
}

export const productSizes: string[] = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const productColors: string[] = [ 'white', 'gray', 'black'];
