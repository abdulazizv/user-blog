"use strict";
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    content: { type: String },
    image: { type: String },
    publish_date: { type: Date, default: new Date() },
    authorId: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" }
}, {
    versionKey: false,
    timestamps: true
});
module.exports = (0, mongoose_1.model)("blogs", BlogSchema);
//# sourceMappingURL=Blog.js.map