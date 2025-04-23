# AWS-3-Tier-Architecture-Project
This repository contains the code for setup of an AWS 3Tier Architecture containing - Web Tier, App Tier and Database Tier.

In today's cloud-driven landscape, scalable, resilient, and secure application infrastructure is the backbone of modern software systems. In this project, we designed and deployed a robust three-tier multi-AZ web architecture on AWS. This setup provides clear separation of concerns, improves availability, and ensures enhanced security across all layers of the stack. Below is a walkthrough of the architectural components and step-by-step deployment methodology used.

# Why Three-Tier Architecture?

Three-tier architecture divides the application into three logical and physical computing tiers:
Web Tier: Handles HTTP requests from clients and serves static content.
Application Tier: Hosts business logic and processes dynamic data.
Database Tier: Manages data persistence securely.

Separating these layers improves maintainability, scalability, and fault tolerance.

# High-Level Overview of the Project

Region: us-west-1 and us-west-2 for multi-AZ deployments

Technologies: AWS EC2, ALB, Auto Scaling Groups, S3, Aurora MySQL, NAT Gateway, VPC

Languages/Frameworks: HTML, CSS, Node.js, React.js

Use Case: A product catalog and quotation system with dynamic database interaction and static content delivery

# Deployment Steps

# Step 1: VPC and Subnet Design

Created a VPC with CIDR block 10.0.0.0/16
Created 2 public subnets for Web Tier (e.g., 10.0.0.0/24, 10.0.3.0/24)
Created 2 private subnets for App Tier (10.0.1.0/24, 10.0.4.0/24) and 2 more for DB Tier (10.0.2.0/24, 10.0.5.0/24)
Attached Internet Gateway to allow internet access for public resources
Deployed 2 NAT Gateways with Elastic IPs for private subnet internet access

# Step 2: Route Tables Configuration

Public Route Table: Routed 0.0.0.0/0 to Internet Gateway, associated with public subnets
Private Route Tables (AZ1 & AZ2): Routed 0.0.0.0/0 to NAT Gateways for App Tier

# Step 3: Security Groups

Configured 5 security groups with least privilege access

Internet-facing ALB: Allows HTTP (80) from anywhere
Web Tier: Allows HTTP (80) from ALB only
Internal ALB: Allows traffic from Web Tier
App Tier: Allows traffic from Internal ALB on port 4000
DB Tier: Allows MySQL traffic (3306) from App Tier only

# Step 4: IAM Role and S3

Created IAM Role granting EC2 access to S3 and SSM
Uploaded static frontend assets and code to versioned S3 bucket

# Step 5: RDS Deployment

Created DB subnet group using private DB subnets
Launched Aurora MySQL cluster with Multi-AZ deployment for high availability
Configured DB SG to accept connections from App Tier SG

# Step 6: EC2 Configuration & Custom AMIs

Launched EC2 instances:
Web Tier: Installed Nginx + React frontend
App Tier: Node.js backend connecting to Aurora MySQL

Created custom AMIs from these instances for ASG templates

# Step 7: Launch Templates and Auto Scaling

Created launch templates using custom AMIs and user data scripts
Configured ASGs with min=2, max=6 for both Web and App Tier
Deployed ASGs in multi-AZ for resilience

# Step 8: Load Balancers

External ALB for Web Tier: Routed user HTTP traffic to Web ASG
Internal ALB for App Tier: Routed traffic from Web Tier to App instances

# Step 9: Target Groups and Health Checks

Created target groups for Web and App Tier Auto Scaling Groups
Configured health check paths to monitor instance availability

# Step 10: Testing and Validation

Validated full application flow from frontend to DB
Performed failover testing across AZs to ensure high availability

# Application Flow

User visits external ALB URL
Web Tier serves static content from local Nginx or pulls from S3
App Tier receives requests via internal ALB, processes logic and interacts with Aurora DB
Results are displayed on screen (e.g., quotations stored/fetched from DB)

# Security Highlights

Isolation: VPC subnets ensure layer separation
Restricted Access: Security groups follow least privilege principle
Data Protection:
S3 bucket encrypted with SSE-S3
Aurora DB encrypted with AWS KMS
Access Management: IAM role restricts EC2 access to only required services
Auditing: CloudTrail can be enabled to monitor API calls

# Additional Enhancements
To further enhance the security, manageability, and observability of this architecture, the following AWS services and practices can be integrated:

1. AWS CloudTrail for Auditing
Enable CloudTrail across the AWS account to track API activity and configuration changes.
Set up trail delivery to S3 for long-term storage and integration with AWS CloudWatch for real-time alerts.
2. AWS Secrets Manager for Database Credentials
Store Aurora DB credentials in Secrets Manager securely.
Retrieve credentials via API call in App Tier instances using IAM roles, eliminating hardcoded passwords.
Manage environment variables and configuration parameters securely.
3. Automate deployments with EC2 Run Command and State Manager.
4. Implement ACM + HTTPS
Secure the web application using an SSL certificate from AWS Certificate Manager.
Enable HTTPS termination at the ALB for encrypted traffic.
5. CloudWatch Alarms and Dashboards
Monitor instance health, CPU utilization, and custom app metrics.
Set up dashboards to visualize traffic and system load.
6. WAF (Web Application Firewall)
Protect your ALB from common web exploits like SQL injection and XSS.
7. Network ACLs (NACLs)
Add stateless network-level access control between subnets.
Define allow/deny rules to restrict traffic by protocol, port, and source IP ranges for an additional security layer.

# Conclusion

This AWS-based three-tier architecture project demonstrates an enterprise-grade solution for hosting scalable, resilient, and secure applications. Through the use of managed services, automation with ASGs, and strict network/security controls, we built a robust platform suitable for real-world workloads.

# Medium Article
https://medium.com/@harsimrankaur06/multi-tier-architecture-on-aws-a-comprehensive-guide-with-sample-application-setup-8a5e2778a736
