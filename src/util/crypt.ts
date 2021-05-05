import crypto from 'crypto'
import * as fs from 'fs'
import * as util from 'util'

export default class {
  /**
   * Generates a random string of characters i.e salt
   * 
   * @function
   * @param {number} length - Length of the random string.
   */
  public static randomString(length: number): string {
    let bytes = crypto.randomBytes(Math.ceil(length / 2))
    
    // convert to hexadecimal format
    let hex = bytes.toString('hex')
    
    // slice required number of characters
    let cut = hex.slice(0, length)

    return cut
  }

  /**
   * Hash password with sha512, salt and pepper
   * 
   * @function
   * @param {string} password
   * @param {string} salt
   */
  public static async hash(password: string, salt: string = '') {
    return crypto.pbkdf2Sync(password, salt + await this.getPepper(), 10000, 64, 'sha512').toString('hex')
  }

  private static pepper:string = "";

  private static async getPepper(): Promise<string> {
    if (this.pepper == "") {
      let rf = util.promisify(fs.readFile);

      try {
        this.pepper = await rf('pepper.txt','UTF8');
      }
      catch(err) {
        if(err.code == 'ENOENT') {
          let wf = util.promisify(fs.writeFile);

          try {
            this.pepper = this.randomString(16);
            await wf('pepper.txt', this.pepper);
          }
          catch {
            console.log('Error writing pepper.txt: ', err.code);
            throw(err);
          }
        } else {
          console.log('Error opening pepper.txt: ', err.code);
          throw(err);
        }
      }
    }

    return this.pepper;
  }
}
