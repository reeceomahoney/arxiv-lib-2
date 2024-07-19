export const testData = [{
      name: "All papers",
      isOpen: false,
      folders: [
        {
          name: "Reinforcement Learning",
          isOpen: false,
          folders: [
            { name: "Model-based RL", isOpen: false, papers: [
              {
                title: "Test Paper 4",
                authors: ["Author 4", "Co-Author 4"],
                date: "2023-07-01",
              },
              {
                title: "Test Paper 5",
                authors: ["Author 5", "Co-Author 5"],
                date: "2023-07-02",
              },
              {
                title: "Test Paper 6",
                authors: ["Author 6", "Co-Author 6"],
                date: "2023-07-03",
              }
            ] },
            { name: "Model-free RL", isOpen: false },
            { name: "Multi-agent RL", isOpen: false },
          ],
        },
        { name: "Imitation learning", isOpen: false, papers: [
          {
            title: "Test Paper 7",
            authors: ["Author 7", "Co-Author 7"],
            date: "2023-07-01",
          },
          {
            title: "Test Paper 8",
            authors: ["Author 8", "Co-Author 8"],
            date: "2023-07-02",
          },
          {
            title: "Test Paper 9",
            authors: ["Author 9", "Co-Author 9"],
            date: "2023-07-03",
          }
        ] },
        { name: "Optimization", isOpen: false },
      ],
      papers: [
        {
          title: "Test Paper 1",
          authors: ["Author 1", "Co-Author 1"],
          date: "2023-07-01",
        },
        {
          title: "Test Paper 2",
          authors: ["Author 2", "Co-Author 2"],
          date: "2023-07-02",
        },
        {
          title: "Test Paper 3",
          authors: ["Author 3", "Co-Author 3"],
          date: "2023-07-03",
        },
      ],
    }]