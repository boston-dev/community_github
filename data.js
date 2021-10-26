db.getCollection('Recommend').aggregate([
    {$match: {imgCount: {$gt: 0},
   maxWeight: {$gt: 0.1}}},
    {
    $sort: {
        msgType: -1,
        time: -1
    }
    },
    {$limit: 10000},
    {$group: {
        _id: "$topic", rowkey: {$push: "$rowkey"}}},
    {
        $project: {
            _id: 1,
            rowkey: {$slice: ["$rowkey", 0, 2]}
        }
    }
])