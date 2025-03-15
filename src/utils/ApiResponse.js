// /**
//  * Represents an API response.
//  * @class
//  */
// class ApiResponse {
//   /**
//    * Creates an instance of ApiResponse.
//    * @param {number} statusCode - The HTTP status code of the response.
//    * @param {*} data - The data to be sent in the response.
//    * @param {string} [message="success"] - The message to be sent in the response.
//    */
//   constructor(statusCode, data, message = "success") {
//     /**
//      * The HTTP status code of the response.
//      * @type {number}
//      */
//     this.statusCode = statusCode;

//     /**
//      * The data to be sent in the response.
//      * @type {*}
//      */
//     this.data = data;

//     /**
//      * The message to be sent in the response.
//      * @type {string}
//      */
//     this.message = message;

//     /**
//      * Indicates whether the response is successful (status code < 400).
//      * @type {boolean}
//      */
//     this.success = statusCode < 400;
//   }
// }
class ApiResponse{
  constructor(statusCode, data, message = "success"){
    this.statusCode = statusCode
    this.data = data
    this.message = message
    this.success = statusCode<400 
  }
  
}

export {ApiResponse}