import Business from "~/server/models/Business";
import Review from "~/server/models/Review";

export async function updateBusinessReviewStats(business: string) {
  try {
    const stats = await Review.aggregate([
      { $match: { business } },
      {
        $group: {
          _id: "$business",
          average: { $avg: "$rating" },
          count: { $sum: 1 },
          one: { $sum: { $cond: [{ $eq: ["$rating", 1] }, 1, 0] } },
          two: { $sum: { $cond: [{ $eq: ["$rating", 2] }, 1, 0] } },
          three: { $sum: { $cond: [{ $eq: ["$rating", 3] }, 1, 0] } },
          four: { $sum: { $cond: [{ $eq: ["$rating", 4] }, 1, 0] } },
          five: { $sum: { $cond: [{ $eq: ["$rating", 5] }, 1, 0] } },
        },
      },
    ]);

    const result = stats[0];
    if (!result)
      return await Business.findByIdAndUpdate(
        business,
        {
          reviewStats: {
            average: 0,
            count: 0,
            breakdown: { one: 0, two: 0, three: 0, four: 0, five: 0 },
          },
        },
        { new: true },
      );

    return await Business.findByIdAndUpdate(
      business,
      {
        reviewStats: {
          average: Number(result.average.toFixed(1)),
          count: result.count,
          breakdown: {
            one: result.one,
            two: result.two,
            three: result.three,
            four: result.four,
            five: result.five,
          },
        },
      },
      { new: true },
    );
  } catch (error) {
    throw error;
  }
}
