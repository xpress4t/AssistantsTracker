import moment from "moment";

export const formatDate = (dateStr) => moment(dateStr).format("DD/MMM/YYYY");
