//== BASICS ==//

/**
 * (1) x is a string, b/c we’ve initialized it
 */
let x = "hello world";

/**
 * (2) reassignment is fine
 */
x = "hello mars";

/**
 * (3) but if we try to change type
 */
x = 42; // 🚨 ERROR

/**
 * (4) let's look at const. The type is literally 'hello world'
 */
const y = "hello world";
function foo(arg: "hello world") {
  ;
}
foo(y) 

interface Object {
  first: string,
  last: string,
  age: number
}

const object: Object = {
  first: "Osama",
  last: "Akhtar",
  age: 21,
  // hobbies: "gym" // not in the interface
}

/**
 * This is called a 'string literal type'. y can never be reassigned since it's a const,
 * so we can regard it as only ever holding a value that's literally the string 'hello world'
 * and no other possible value
 */

/**
 * (5) sometimes we need to declare a variable w/o initializing it
 */
let z;
z = 41;
z = "abc"; // (6) oh no! This isn't good

/**
 * If we look at the type of z, it's `any`. This is the most flexible type
 * in TypeScript (think of it like a JavaScript `let`)
 */

/**
 * (7) we could improve this situation by providing a type annotation
 * when we declare our variable
 */
let zz: number;
zz = 41;
zz = "abc"; // 🚨 ERROR Type '"abc"' is not assignable to type 'number'.

//== SIMPLE ARRAYS ==//

/**
 * (8) simple array types can be expressed using []
 */
let aa: string[]  = [];
aa.push("abc"); 
aa.push(33); // 🚨 ERROR: Argument of type '33' is not assignable to parameter of type 'string'.

/**
 * (9) we can even define a tuple, which has a fixed length
 */
let bb: [number, string, string, number] = [
  123,
  "Fake Street",
  "Nowhere, USA",
  10110,
];

bb = [1, 2, 3]; // 🚨 ERROR: Type 'number' is not assignable to type 'string'.
bb.push("string") // order does not matter. Push accepts "string" or "number"
/**
 * (10) Tuple values often require type annotations (  : [number, number] )
 */
const xx = [32, 31]; // inferred umber[];
const yy: [number, number] = [32, 31];
yy.pop() // this and other mutating methods should not be allowed for tuples I think
//== OBJECTS ==//

/**
 * (11) object types can be expressed using {} and property names
 */

// how is this diff from an interface
// we cannot reuse it, cc is just a variable declared to have such shape
let cc: { houseNumber: number; streetName: string }; 
cc = {
  streetName: "Fake Street",
  houseNumber: 123
};

cc = {
  houseNumber: 33
};
/**
 * 🚨 Property 'streetName'
 * 🚨   is missing in type   '{ houseNumber: number; }'
 * 🚨   but required in type '{ houseNumber: number; streetName: string; }'.
 */

/**
 * (12) You can use the optional operator (?) to
 * indicate that something may or may not be there
 */
let dd: { houseNumber: number; streetName?: string };
dd = {
  houseNumber: 33
};

// (13) if we want to re-use this type, we can create an interface
interface Address {
  houseNumber: number;
  streetName?: string;
}
// // and refer to it by name
let ee: Address = { houseNumber: 33 };
const osamaAddress: Address = { houseNumber: 147, streetName: "Mars" }
//== UNION & INTERSECTION ==//

/**
 * (14) Union types
 * Sometimes we have a type that can be one of several things
 */

export interface HasPhoneNumber {
  name: string;
  phone: number;
}

export interface HasEmail {
  name: string;
  email: string;
}

let contactInfo: HasEmail | HasPhoneNumber =
  Math.random() > 0.5
    ? {
        // we can assign it to a HasPhoneNumber
        name: "Mike",
        phone: 3215551212
      }
    : {
        // or a HasEmail
        name: "Mike",
        email: "mike@example.com"
      };

contactInfo.name; // NOTE: we can only access the .name property  (the stuff HasPhoneNumber and HasEmail have in common)
contactInfo.phone; // error


/**
 * (15) Intersection types
 */
let otherContactInfo: HasEmail & HasPhoneNumber = {
//   // we _must_ initialize it to a shape that's asssignable to HasEmail _and_ HasPhoneNumber
  name: "Mike",
  phone: 3215551212, // if we comment this then the object does not satisfy the union of the types
  email: "mike@example.com",
};

otherContactInfo.name; // NOTE: we can access anything on _either_ type
otherContactInfo.email;
otherContactInfo.phone;

export default {};
