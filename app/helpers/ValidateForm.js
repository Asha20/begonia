export default function(tests) {
  const statuses = [];

  tests.forEach(test => {
    if (test.condition) {
      statuses.push({
        "valid": true,
        container: test.container,
        message: test.message
      });
    } else {
      statuses.push({
        "valid": false,
        container: test.container,
        message: test.message
      });
    }
  });

  let isSucess = true;

  for (let status of statuses) {
    if (status.valid) {
      status.container.removeClass("has-error");
      status.message.addClass("hide");
    } else {
      status.container.addClass("has-error");
      status.message.removeClass("hide");
      isSucess = false;
    }
  }

  return isSucess;
}