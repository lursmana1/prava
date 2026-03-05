export type LeaderboardEntry = {
  userId: number;
  place: number;
  name: string | null;
  surname: string | null;
  score: number;
};

export type LeaderboardCurrentUser = {
  userId: number;
  place: number | null;
  name: string;
  surname: string | null;
  score: number;
};

export type LeaderboardResponse = {
  startDate: string;
  endDate: string;
  data: LeaderboardEntry[];
  currentUser: LeaderboardCurrentUser;
  total: number;
  page: number;
  totalPages: number;
};
