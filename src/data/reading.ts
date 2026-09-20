export type ReadingStatus = "DONE" | "IN PROGRESS" | "WANT TO READ";

export type ReadingItem = {
  title: string;
  author: string;
  category: string;
  takeaway: string;
  status: ReadingStatus;
  isbn?: string;
};

export const reading: ReadingItem[] = [
  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "System Design", takeaway: "The best mental model for replication, partitioning and consistency trade-offs. Re-read every couple of years.", status: "DONE", isbn: "9781449373320" },
  { title: "Spanner: Google's Globally-Distributed Database", author: "Corbett et al.", category: "Technical", takeaway: "TrueTime turns clock uncertainty into an explicit, bounded quantity you can wait out.", status: "DONE" },
  { title: "Database Internals", author: "Alex Petrov", category: "Technical", takeaway: "Storage engines and distributed protocols side by side; the B-tree chapters are excellent.", status: "IN PROGRESS", isbn: "9781492040347" },
  { title: "A Philosophy of Software Design", author: "John Ousterhout", category: "Technical", takeaway: "Deep modules and small interfaces: complexity is the enemy, and it accumulates quietly.", status: "DONE", isbn: "9781732102200" },
  { title: "The Dynamo Paper", author: "DeCandia et al.", category: "System Design", takeaway: "Eventual consistency as a product decision, not just an engineering compromise.", status: "IN PROGRESS" },
  { title: "Thinking in Systems", author: "Donella Meadows", category: "Non-Fiction", takeaway: "Feedback loops and leverage points explain many organisational and technical failures.", status: "WANT TO READ", isbn: "9781603580557" },
  { title: "Site Reliability Engineering", author: "Beyer et al.", category: "System Design", takeaway: "Error budgets align product velocity with reliability in a way that ends the argument.", status: "WANT TO READ", isbn: "9781491929124" },
];
