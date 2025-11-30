const { PrismaClient } = require('@prisma/client')

async function main() {
  console.log('🔍 Checking database connection...')
  
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })
  
  try {
    console.log('📡 Attempting to connect to database...')
    await prisma.$connect()
    console.log('✅ Database connection successful')
    
    // Test basic query
    console.log('🔍 Testing database queries...')
    const userCount = await prisma.user.count()
    console.log(`📊 Found ${userCount} users in database`)
    
    // Test all main tables
    const beritaCount = await prisma.berita.count()
    console.log(`📰 Found ${beritaCount} berita in database`)
    
    const jadwalCount = await prisma.jadwal.count()
    console.log(`📅 Found ${jadwalCount} jadwal in database`)
    
    console.log('🎉 Database health check passed!')
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    console.error('Full error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    console.log('🔌 Database connection closed')
  }
}

if (require.main === module) {
  main()
}

module.exports = { main }