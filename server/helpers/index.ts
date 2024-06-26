import ActionRecord from "../library/ActionRecord";
import { ResponseData } from "../types/ActionRecordTypes";
import { CLASSES } from "../types/ActionRecordTypes";

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function conditionConverter(text: string): string {
  let result: any = seprateParantheses(text);
  result = converter(result);
  result = mergeParantheses(result);
  return result;
}

function seprateParantheses(text: string): string[] | string {
  let parantheses = /\(.+\)/;
  if (!parantheses.test(text)) return text;
  let index1 = text.indexOf("(");
  let index2 = index1,
    k = 1;
  do {
    index2++;
    if (text.charAt(index2) === "(") {
      k++;
    }
    if (text.charAt(index2) === ")") {
      k--;
    }
  } while (k !== 0);
  let first = text.substring(0, index1),
    middle = text.substring(index1 + 1, index2),
    end = text.substring(index2 + 1);
  let result = Array(3).fill("");
  result[0] = parantheses.test(first) ? seprateParantheses(first) : first;
  result[1] = parantheses.test(middle) ? seprateParantheses(middle) : middle;
  result[2] = parantheses.test(end) ? seprateParantheses(end) : end;
  return result;
}

function mergeParantheses(array: string[] | string): string {
  if (typeof array === "string") return array;
  let first: string, middle: string, end: string;
  first = typeof array[0] === "string" ? array[0] : mergeParantheses(array[0]);
  middle = typeof array[1] === "string" ? array[1] : mergeParantheses(array[1]);
  end = typeof array[2] === "string" ? array[2] : mergeParantheses(array[2]);

  return `${first} ( ${middle} ) ${end}`;
}

function conditionMaker(text: string): string {
  if (text.trim() === "") return text;
  let temp = text.split("/");
  if (temp.length < 3) return text;
  let result = `\`${temp[0]}\` ${temp[1]}`;
  if (temp[1].toLowerCase() === "like") {
    result += ` '%${temp[2]}%' `;
  } else if (temp[1].toLowerCase() === "between") {
    let t = temp[2].split(",");
    result += ` ${t[0]} AND ${t[1]} `;
  } else if (temp[1].toLowerCase() === "in") {
    result += ` (${temp[2]}) `;
  } else {
    result += ` '${temp[2]}' `;
  }
  return result;
}

function converter(con: string | string[]): string | string[] {
  if (typeof con !== "string") {
    return con.map((value) => converter(value) as string);
  }

  let temp = con.split("&&");
  temp = temp.map((value) => {
    let t = value.split("||");
    if (typeof t !== "string") {
      let t1 = t.map((val) => {
        return conditionMaker(val);
      });
      return t1.join(" OR ");
    }

    return conditionMaker(t);
  });

  return temp.join(" AND ");
}

function checkInputs(
  names: string[],
  post: { [key: string]: string }
): {
  status: boolean;
  data: { [key: string]: string };
  missing: string;
} {
  let missing: string[] = [],
    status = true,
    data: { [key: string]: string } = {};
  names.forEach((value) => {
    if (typeof post[value] === "undefined") {
      status = false;
      missing.push(value);
      return;
    }
    data[value] = post[value];
  });

  return {
    status,
    data,
    missing:
      missing.length > 0 ? `missing arguments: ${missing.join(", ")}` : "",
  };
}

function makePath(path: string) {
  return `http://localhost:3000/${path}`;
}

function makeResponse(
  data: any | undefined = undefined,
  status: "error" | "success" = "success"
): ResponseData {
  if (status === "success") {
    return {
      status: true,
      result: data,
    };
  }
  return {
    status: false,
    errors: data,
  };
}

//* اطلاعاتی را که key آنها در model مربوطه موجود میباشد از متغییر data استخراج میکند.
function getData(
  data: { [key: string]: string | number },
  cls: string
): { [key: string]: string | number } {
  if (!Object.keys(CLASSES).includes(cls)) {
    return {};
  }
  // @ts-ignore
  let m: ActionRecord = CLASSES[cls]();
  let d: { [key: string]: string | number } = {},
    keys = Object.keys(data);
  m.fields.forEach((value) => {
    if (keys.includes(value.name)) {
      d[value.name] = data[value.name];
    }
  });
  return d;
}

export {
  capitalize,
  conditionConverter,
  checkInputs,
  makePath,
  makeResponse,
  getData,
};
