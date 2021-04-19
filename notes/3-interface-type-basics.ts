import { HasPhoneNumber, HasEmail } from "./1-basics";

//== TYPE ALIAS ==//
/**
 * (1) Type aliases allow us to give a type a name
 */
type StringOrNumber = string | number;

// // this is the ONLY time you'll see a type on the RHS of assignment
// compiles to no JS at all
type HasName = { name: string };

// NEW in TS 3.7: Self-referencing types!
type NumVal = 1 | 2 | 3 | NumVal[];
const test: NumVal = [1, 3, 2, [1, 2, 2]];

// == INTERFACE == //
/**
 * (2) Interfaces can extend from other interfaces
 */

export interface HasInternationalPhoneNumber extends HasPhoneNumber {
  countryCode: string;
}

const extendedObj: HasInternationalPhoneNumber = {
  name: "Osama",
  phone: 42,
  countryCode: "+92", // this is the extended prop from above interface
};

/**
 * (3) they can also be used to describe call signatures
 */

// interfaces can describe objects, functions and arrays.
// Any thing that has a Prototype
// Type aliases are flexible to primitives like string and number as well
interface ContactMessenger1 {
  (contact: HasEmail | HasPhoneNumber, message: string): boolean;
}

// so this interface describes the signature for a function
const Osama: HasEmail = {
  name: "Osama",
  email: "osama@osama.com",
};

// since we have already interfaced this function, we do not need to
// type the params every invocation.
const contactFunction: ContactMessenger1 = (contact, message) => true;
contactFunction(Osama, "Learning TypeScript");
contactFunction();

// type aliased way => determining the signature of a function using a type alias
type ContactMessenger2 = (
  contact: HasEmail | HasPhoneNumber,
  message: string
) => void;

// // NOTE: we don't need type annotations for contact or message
const emailer: ContactMessenger1 = (_contact, _message) => {
  /** ... */
  return false;
};

/**
 * (4) construct signatures can be described as well
 */

interface ContactConstructor {
  new (...args: any[]): HasEmail | HasPhoneNumber;
}

/**
 * (5) index signatures describe how a type will respond to property access
 */

/**
 * @example
 * {
 *    iPhone: { areaCode: 123, num: 4567890 },
 *    home:   { areaCode: 123, num: 8904567 },
 * }
 */

interface PhoneNumberDict {
  // arr[0],  foo['myProp']
  // index signature
  [prop: string]:
    | undefined
    | {
        areaCode: number;
        num: number;
      };
}

const pnd: PhoneNumberDict = {};

const phoneDict: PhoneNumberDict = {
  office: { areaCode: 321, num: 5551212 },
  home: { areaCode: 321, num: 5550010 }, // try editing me
  iPhone: undefined,
  // not compliant with our index signature
  thisShouldBeCalledOutFor: {
    noAreaCode: true,
  },
};

// at most, a type may have one string and one number index signature

/**
 * (6) they may be used in combination with other types
 */

// // augment the existing PhoneNumberDict
// // i.e., imported it from a library, adding stuff to it
interface PhoneNumberDict {
  home: {
    /**
     * (7) interfaces are "open", meaning any declarations of the
     * -   same name are merged
     */
    areaCode: number;
    num: number;
  };
  office: {
    areaCode: number;
    num: number;
  };
  // this prop is not following the index signature in prev interface
  thisShouldBeCalledOutFor: {
    noAreaCode: boolean;
  };
}
// above, we add to interface saying that apart from the index signature
// we need to mandatory properties (home and office) inside any variable of this type

phoneDict.home; // definitely present
phoneDict.office; // definitely present
phoneDict.iPhone; // present
phoneDict.mobile; // MAYBE present

// == TYPE ALIASES vs INTERFACES == //

/**
 * (7) Type aliases are initialized synchronously, but
 * -   can reference themselves
 */

type NumberVal = 1 | 2 | 3 | NumberVal[];

/**
 * (8) Interfaces are initialized lazily, so combining it
 * -   w/ a type alias allows for recursive types!
 */

type StringVal = "a" | "b" | "c" | StringArr;

// // type StringArr = StringVal[];
interface StringArr {
  //   // arr[0]
  [k: number]: "a" | "b" | "c" | StringVal[];
}

const x: StringVal = Math.random() > 0.5 ? "b" : ["a"]; // ✅ ok!

export default {};
