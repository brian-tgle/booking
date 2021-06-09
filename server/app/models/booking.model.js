export default (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      eventCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'eventCategory' },
      location: String,
      proposedDateOptions: Array,
      proposedDate: Date,
      status: String,
      rejectionReason: String,
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);

  const Booking = mongoose.model("booking", schema);
  return Booking;
};
