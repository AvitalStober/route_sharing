import ReadMore from "@/app/components/ReadMore";

const RoutePage = () => {
  const mockRoute = {
    owner: "John Doe",
    mapPoints: [
      { lat: 37.7749, lng: -122.4194 },
      { lat: 37.7849, lng: -122.4294 },
    ],
    rate: 4.5,
    ratingNum: 10,
    description: "A scenic route through San Francisco.",
    gallery: [],
    isHistoryState: false,
  };

  const handleAddImage = (imageUrl: string) => {
    console.log("New image added:", imageUrl);
  };

  return (
    <ReadMore
      owner={mockRoute.owner}
      mapPoints={mockRoute.mapPoints}
      rate={mockRoute.rate}
      ratingNum={mockRoute.ratingNum}
      description={mockRoute.description}
      gallery={mockRoute.gallery}
      isHistoryState={mockRoute.isHistoryState}
      onAddImage={handleAddImage}
    />
  );
};

export default RoutePage;
