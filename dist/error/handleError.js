const handleError = (err, res) => {
    console.log("internal server error");
    console.log(err);
    res.status(500).json({
        success: false,
        message: "internal server error",
    });
};
export { handleError };
