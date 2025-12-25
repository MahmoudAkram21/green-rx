import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/client';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🗑️  Clearing all stock quantities from database...');

    try {
        // Update all trade names to set stockQuantity to null
        const result = await prisma.tradeName.updateMany({
            where: {
                stockQuantity: {
                    not: null
                }
            },
            data: {
                stockQuantity: null
            }
        });

        console.log(`✅ Successfully cleared stock quantities from ${result.count} trade names`);
        console.log('   All stock quantities have been set to null');
    } catch (error) {
        console.error('❌ Error clearing stock quantities:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    });
