//Third Party Imports
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";

//First Party Imports
import Base64 from './Base64';
import { IElevatedState } from '../Interfaces/ElevatedState';


export function fileListToList(fileList: FileList){
  let files: File[] = []
  for (let fileIndex = 0; fileIndex < fileList.length; fileIndex++){
    files.push(fileList[fileIndex]);
  }

  return files
}


export function validateFileList(files: FileList | File[], extensionList: string[]): [File[], string[]]{
  let validFiles: File[] = []
  let badExtensions: string[] = []

  for (let fileIndex = 0; fileIndex < files.length; fileIndex++){
    const extension = files[fileIndex].name.split('.').pop()!.toLowerCase()

    if(!extensionList.includes(extension)){
      badExtensions.push(extension)
      continue
    }

    validFiles.push(files[fileIndex]);
  }

  return [validFiles, badExtensions]
}


export function validateFilenameList(filenames: string[], extensionList: string[]): [string[], string[]]{
  let validFiles: string[] = []
  let badExtensions: string[] = []

  for (let fileIndex = 0; fileIndex < filenames.length; fileIndex++){
    const extension = filenames[fileIndex].split('.').pop()!.toLowerCase()

    if(!extensionList.includes(extension)){
      badExtensions.push(extension)
      continue
    }

    validFiles.push(filenames[fileIndex]);
  }

  return [validFiles, badExtensions]
}


export async function urlToFile(url: string, filename=String(uuid.v4())): Promise<File | undefined>{
  let fileOptions: FilePropertyBag = {}
  const returnFile = await fetch(url).then(res => {
    if(res.headers.get("Content-Type")) fileOptions['type'] = res.headers.get("Content-Type")!
    return res.blob()
  }).then(blob => {
    return new File([blob], filename, fileOptions)
  }).catch((error) => console.error(error))

  if(!returnFile) return undefined;
  else return returnFile!
}


export function pickMedia(setElevatedState: React.Dispatch<React.SetStateAction<IElevatedState>>, 
  action: (media: ImageOrVideo) => void, multiple: boolean=false){
  ImagePicker.openPicker({
    mediaType: 'any',
    multiple: multiple,
    writeTempFile: false,
    forceJpg: true,
  }).then((media) => {
    action(media);
  }).catch((err) => {
    setElevatedState(prev => ({...prev, msg: String(err)}))
  });
}


export function dataURItoBlob(dataURI: string) {
  let byteCharacters = Base64.atob(dataURI.split(',')[1]);

  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray]);

  return blob
}


export async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}
