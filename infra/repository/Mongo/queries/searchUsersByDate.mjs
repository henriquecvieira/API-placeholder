const query = (date) => ({
  $expr: {
    $and: [
      { $eq: [{ $dayOfMonth: "$createdAt" }, { $dayOfMonth: new Date(date) }] },
      { $eq: [{ $month: "$createdAt" }, { $month: new Date(date) }] },
      { $eq: [{ $year: "$createdAt" }, { $year: new Date(date) }] },
    ],
  },
})

export default {
  query,
}
