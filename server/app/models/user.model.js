import sha256 from 'sha256';

export default (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      username: String,
      password: String,
      role: String,
      fullname: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.method("comparePassword" ,function comparePassword(password) {
    return this.password === sha256(password);
  });

  schema.plugin(mongoosePaginate);

  const User = mongoose.model("user", schema);
  return User;
};
