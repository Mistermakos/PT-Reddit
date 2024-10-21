//takes query and only returns given values
export const Includes = async (obj, values) => {
  try {
    let res_obj = [];
    values.forEach((ele) => {
      if (obj[ele] === undefined) {
        res_obj = [];
        return res_obj;
      } else {
        res_obj.push(obj[ele]);
      }
    });
    return res_obj;
  } catch (err) {
    throw "There is error somewhere";
  }
};
