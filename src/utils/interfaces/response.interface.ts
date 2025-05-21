export interface ResponseInterface {
  status: "Compile Error."| "Passed all tests!" | "Failed.";
  testcases?: TestCaseR[];
  error?: string;
}

interface TestCaseR {
  id: string;
  status: "Passed" | "Failed";
  input: string;
  expected: string;
  output: string;
}
