import child_process from "child_process";
const spawn = child_process.spawn;

export default function runCmd(
  cmd: string,
  args: any[],
  callback: any,
  finalCallback: any
) {
  let child = spawn(cmd, args);

  if (child.stdout) {
    child.stdout.on("data", function (buffer) {
      try {
        callback(buffer.toString());
      } catch (error) {}
    });
    child.stdout.on("end", function () {
      try {
        finalCallback(`專案-${args[1]} :完成部署`);
      } catch (error) {}
    });
  }
}
