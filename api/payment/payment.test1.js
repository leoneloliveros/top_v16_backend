beforeEach(() => {
  console.log("BeforeEach")
})

afterEach(() => {
  console.log("AfterEach")
})

beforeAll(() => {
  console.log('BeforeAll')
})

afterAll(() => {
  console.log('afterAll')
})

test("get products", () => {
  console.log('get Products 1')
  expect(2+2).toBe(4)
})

test("get products", () => {
  console.log('get Products 2')
  expect(2+2).toBe(4)
})