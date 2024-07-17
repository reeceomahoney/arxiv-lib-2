export const testData = [{
      name: "All papers",
      isOpen: false,
      folders: [
        {
          name: "Reinforcement Learning",
          isOpen: false,
          folders: [
            { name: "Model-based RL", isOpen: false },
            { name: "Model-free RL", isOpen: false },
            { name: "Multi-agent RL", isOpen: false },
          ],
        },
        { name: "Imitation learning", isOpen: false },
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