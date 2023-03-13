
/**
 * bolb格式转换为base64
 * @param blob 
 * @returns 
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise(resolve => {
    let r = new FileReader();
    r.onload = function (e: any) {
      resolve(e.target.result);
    }
    r.readAsDataURL(blob);
  })
}